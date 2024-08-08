import { fetchProfileAction } from '@/actions';
import Onboard from '@/components/on-board'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const OnBoardPage = async () => {
  const user = await currentUser();
  // fetch profile info
  const profileInfo = await fetchProfileAction(user?.id);

  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser) 
      redirect("/membership");
    else 
      redirect("/")
  } else
  return (
    <>
      <Onboard/>
    </>
  )
}

export default OnBoardPage