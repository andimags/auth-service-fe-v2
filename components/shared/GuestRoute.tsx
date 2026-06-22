import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import { redirectToDashboard } from '@/lib/auth';

type GuestRouteProps = {
    children: React.ReactNode;
};

export async function GuestRoute({
    children,
}: Readonly<GuestRouteProps>) {
    try {
        const session = await getServerSession(authOptions);

        if (session && !session.error) {
            redirectToDashboard();
        }
    } catch {
        // Session retrieval failed — treat as unauthenticated, render login page normally
    }

    return <>{children}</>;
}