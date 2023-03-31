
import Header from "./Header";
import Sidebar from "./Sidebar";
import IndexLayout from "./layout/index";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {/* <IndexLayout> */}
            {children}
            {/* </IndexLayout> */}

        </div>
    )
}