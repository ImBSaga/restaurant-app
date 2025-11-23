import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="min-h-screen">
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}
