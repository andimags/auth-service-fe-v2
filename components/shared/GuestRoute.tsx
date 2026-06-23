import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

type GuestRouteProps = {
    children: React.ReactNode;
};

export async function GuestRoute({ children }: Readonly<GuestRouteProps>) {
    let session = null;

    try {
        session = await getServerSession(authOptions);
    } catch {
        // Ignore — token refresh failures, network errors, etc.
    }

    // redirect() is now OUTSIDE the try/catch so it can't be swallowed
    if (session && !session.error) {
        redirect('/');
    }

    return <>{children}</>;
}