

export default function Sales(props) {
    //get order list from api for this month

    return (
        <div>
            {props && <h1>{props.message}</h1>}
        </div>
    );
}