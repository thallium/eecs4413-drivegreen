

export default function Sales(props) {
    //get order list from api for this month

    return <>
    {props && <h1>{props.res.message}</h1>}
    {!props && <h1>null...</h1>}
    </>;
}