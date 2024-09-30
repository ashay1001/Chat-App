import Victory from "@/assets/chat-bubble.svg"

function Auth() {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-3"> 
              <h1 className="text-5xl font-bold text-green-600 md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[70px]" />
            </div>
            <p className="font-medium text-center"> Fill the details to get started!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth