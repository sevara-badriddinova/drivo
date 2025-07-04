import SearchCar from "@/_components/search_car";

export default function Home(){
   return (
    <div className="pt-20 flex flex-col">
        {/* Hero */}
        <section className="relative py-16 md:py-28 bg-gradient-to-b from-neutral-900 via-zinc-900 to-yellow-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-5xl md:text-8xl mb-4 gradient-title">Find your dream car with DriVo AI</h1>
                    <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                        Advanced AI Car Search 
                    </p>
                </div>
                {/* Search */}
                <SearchCar />
            </div>
        </section>
    </div>
   )
}