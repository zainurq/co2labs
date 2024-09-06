import Backbutton from "../components/Backbutton";

const Notfound = () => {
    return(
        <section className="text-primary-500 flex flex-col items-center justify-center h-screen gap-5">
            <div>
                <img src="/images/logo.png" alt="brand-logo" className="w-20" />
            </div>
            <h4>Something’s missing.</h4>
            <h1 className="font-generalsans font-bold text-9xl">404</h1>
            <h6 className="text-gray-400 mx-5">Sorry, we cant find that page. Youll find lots to explore on the home page.</h6>
            <Backbutton />
            <div className="flex flex-wrap justify-center gap-5">
                <a href="" className="flex items-center">
                    <i className='bx bxl-instagram-alt text-2xl mr-1'></i>@co2labs
                </a>
                <a href="" className="flex items-center">
                    <i className='bx bxl-gmail text-2xl mr-1'></i>support@co2labs.com
                </a>
                <a href="" className="flex items-center">
                    <i className='bx bxs-phone text-2xl mr-1'></i>081-123-456
                </a>
            </div>
        </section>
    );
};
export default Notfound;