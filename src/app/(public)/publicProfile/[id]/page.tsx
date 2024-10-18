import { getUserById } from '@/app/actions/userActions'
import PublicProfile from '@/components/public-profile'
import React from 'react'
interface Props {
    params: {
        id: string
    }
}
const publicProfile = async ({ params }: Props) => {
    const id = params.id
    const user = await getUserById(id);

    return (
        <PublicProfile {...user} />
    )
}

export default publicProfile