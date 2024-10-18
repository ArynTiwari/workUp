import React from 'react'
interface ProjectParams {
    params: {
        id: string
    }
}
const project = ({ params }: ProjectParams) => {
    const { id } = params;
    console.log(id)
    return (
        <div>{id}</div>
    )
}

export default project