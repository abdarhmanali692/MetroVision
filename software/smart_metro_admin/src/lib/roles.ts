export const homeFor = (role?: string) => (role === 'Admin' ? '/dashboard' : '/app');
export const isSupportedRole = (role?: string) => role === 'Admin' || role === 'Passenger';
