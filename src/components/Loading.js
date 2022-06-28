import { Puff } from "react-loader-spinner"

export const Loading = () => {

return <>
    <div>
        <Puff
            height="100"
            width="100"
            color="black"
            ariaLabel='loading'
        />
    </div>
    </>
}
