

export default function Sales(props) {
    //get order list from api for this month

    return <>
    {props.res && <h1>{props.res.message}</h1>}
    {!props.res && <h1>null...</h1>}
    </>;
}
