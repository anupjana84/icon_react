import Header from "@/layout/header";
import { useForm } from "@inertiajs/react";
import PageHeader from "../../../layout/components/pageHeader";
const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        post("/brands");
    };
    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Brands > Add"
                    link="/brands"
                    linkName="Back"
                />
                {/* <p>content</p> */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl text-black font-bold mb-6">
                        Brands Add Form
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="category"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="category"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={`w-full px-3 py-2 border rounded-lg 
                                    text-black
                                    focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="Brand
                                ${errors.name && "ring-red-500"}`}
                            />
                            {errors.name && (
                                <p className="text-red-600">{errors.name}</p>
                            )}
                        </div>
                        {processing ? (
                            <div class="flex items-center justify-center h-10">
                                <div class="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <h4>page</h4
                        >
                    </div> */}
            </main>
        </>
    );
};

export default Create;
