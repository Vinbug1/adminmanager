
import Sidebar from "@/pages/Sidebar";
import Header from "../Header";

const IndexLayout = ({ children, ...props }: any) => {
    return (
        <div>
            <div className='bg-gray-100 min-h-screen'>
                <Sidebar >
                    <Header />
                    {children}
                </Sidebar>
            </div>
        </div>
    )
}
export default IndexLayout