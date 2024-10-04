import { Link } from "@inertiajs/react";
import {
    AlignJustify,
    CalendarDays,
    LetterText,
    NotebookTabs,
} from "lucide-react";
const Header = ({ title }) => {
    return (
        <>
            <header className="bg-gradient-to-br from-[#000046] to-[#1CB5E0] bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
                <div className="max-w-7xl flex justify-between mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-100">
                        Admin Panel
                    </h1>
                </div>
            </header>
        </>
    );
};

export default Header;
