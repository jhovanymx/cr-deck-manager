export default function IdentityLayout({ children }){
  return (
    <div className="flex bg-blue-400">
      <div className="mx-auto lg:my-16 my-8 bg-slate-50 rounded-md border  w-3/5 h-3/5 grid lg:grid-cols-2">
        <div className="hidden lg:flex rounded-md">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('/images/loginScreen.png')]"></div>
        </div>
        <div className="flex flex-col justify-evenly bg-gray-50">
          <div className="text-center py-10">
              {children}
          </div>
        </div>
      </div>
    </div>
  )
};