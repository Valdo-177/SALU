// import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <div className="flex items-center h-[90dvh]">
                {/* <div className="">
                    <Sidebar />
                </div> */}
                <div className="w-full mt-8 overflow-y-auto px-7 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
