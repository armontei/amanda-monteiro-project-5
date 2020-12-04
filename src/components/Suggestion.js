const Suggestion = ({room, suggestionHandler}) => {

    return (
        <button onClick={() => { suggestionHandler(room) }} className="suggestBtn" room>Need a suggestion?</button>
    )
}

export default Suggestion;