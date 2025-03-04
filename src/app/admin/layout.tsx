import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <div className="flex items-center min-h-[93vh] max-h-[93vh] ">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-full max-h-[91.3vh] min-h-[91.3vh] mt-5 overflow-y-auto px-7">
                    {children}
                </div>
            </div>
        </div>
    );
}
