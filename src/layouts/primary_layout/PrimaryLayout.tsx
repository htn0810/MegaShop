import Footer from '@/modules/home/footer'
import Header from '@/modules/home/header'
import ChatBox from '@/components/chat/ChatBox'

type Props = {
  children: React.ReactNode
}

const PrimaryLayout = (props: Props) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='max-w-screen-2xl mx-auto flex flex-col flex-grow w-full'>
        <Header />
        <div className='md:mt-[160px] z-10 mt-[80px] mb-6 px-4 sm:px-10 xl:px-40 md:px-20 flex-grow'>
          {props.children}
        </div>
      </div>
      <Footer />
      {/* Global Chat Box Component */}
      <ChatBox />
    </div>
  )
}

export default PrimaryLayout
