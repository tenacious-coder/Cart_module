import prisma from '../lib/prisma.js';

/**
 * 1. Fetch profile + nested user data (Used for getUser)
 */
export async function fetchUser(id) {
    return await prisma.user_profiles.findMany({
        where: { user_id: parseInt(id) },
        include: {
            users_user_profiles_user_idTousers: {
                select: {
                    email: true, role: true, status_active: true,
                    last_login: true, registration_method: true,
                    password_hash: true, last_password_changed_at: true,
                    user_location: true, user_city: true, user_country: true
                }
            },
        },
    });
}

/**
 * 2. Fetch All Users for Admin (Search, Filter, Pagination)
 */
export async function fetchAllUsersAdmin({ where, skip, take }) {
    return await prisma.users.findMany({
        where,
        select: {
            user_id: true, first_name: true, last_name: true, email: true,
            role: true, status_active: true, last_login: true,
            created_at: true, updated_at: true,
            userProfiles: { select: { phone: true, avatar_url: true, bio: true } }
        },
        orderBy: { created_at: 'desc' },
        skip, take
    });
}

/**
 * 3. Fetch specific user details by ID (Admin)
 */
export async function findUserByIdForAdmin(userIdInt) {
    return await prisma.users.findUnique({
        where: { user_id: userIdInt },
        select: {
            user_id: true, first_name: true, last_name: true, email: true,
            role: true, status_active: true, active_date: true,
            inactive_date: true, last_login: true, failed_login_attempts: true,
            is_locked: true, created_at: true, updated_at: true,
            userProfiles: { select: { profile_id: true, first_name: true, last_name: true, phone: true, avatar_url: true, bio: true, created_at: true, updated_at: true } }
        }
    });
}

/**
 * 4. Update Profile (Atomic Transaction for consistency)
 */
export async function updateUserProfileTransaction(id, data, avatarUrl) {
    const userId = parseInt(id);
    return await prisma.$transaction(async (tx) => {
        // Update Table: users
        await tx.users.update({
            where: { user_id: userId },
            data: {
                first_name: data.first_name, last_name: data.last_name,
                user_location: data.user_location, user_city: data.user_city,
                user_country: data.user_country, updated_by: userId, updated_at: new Date()
            },
        });
        // Find profile record
        const profile = await tx.user_profiles.findFirst({ where: { user_id: userId } });
        // Update Table: user_profiles
        return await tx.user_profiles.update({
            where: { profile_id: profile.profile_id },
            data: {
                first_name: data.first_name, last_name: data.last_name,
                bio: data.bio, phone: data.phone,
                avatar_url: avatarUrl || profile.avatar_url,
                updated_by: userId, updated_at: new Date()
            }
        });
    });
}

/**
 * 5. Update Password (FIX: Sets last_password_changed_at)
 */
export async function updatePassword(id, hashedPassword) {
    return await prisma.users.update({
        where: { user_id: parseInt(id) },
        data: {
            password_hash: hashedPassword,
            registration_method: "email",
            last_password_changed_at: new Date(), // Fixed the null issue
            updated_by: parseInt(id),
            updated_at: new Date()
        },
    });
}

/**
 * 6. User Auth Data Fetch (For checkPass)
 */
export async function getUserAuthData(id) {
    return await prisma.users.findUnique({
        where: { user_id: parseInt(id) }
    });
}

/**
 * 7. Admin: Update Role, Status, or Unlock
 */
export async function updateGenericUserFields(userId, updateData) {
    return await prisma.users.update({
        where: { user_id: parseInt(userId) },
        data: { ...updateData, updated_at: new Date() }
    });
}

/**
 * 8. User Settings Logic (All moved from routes)
 */
export async function getUserSettings(id) {
    return await prisma.user_settings.findMany({ where: { user_id: parseInt(id) } });
}

export async function upsertUserSetting(userId, key, value, type) {
    const userIdInt = parseInt(userId);
    const existing = await prisma.user_settings.findFirst({
        where: { user_id: userIdInt, setting_key: key }
    });

    if (existing) {
        return await prisma.user_settings.update({
            where: { setting_id: existing.setting_id },
            data: { setting_value: String(value), setting_type: type, updated_by: userIdInt, updated_at: new Date() }
        });
    }

    return await prisma.user_settings.create({
        data: { user_id: userIdInt, setting_key: key, setting_value: String(value), setting_type: type, created_by: userIdInt }
    });
}