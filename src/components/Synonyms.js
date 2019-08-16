import React, { Component } from 'react'

export class Synonyms extends Component {
    state = {
        word: '',
        data: [],
        error: '',
        loading: false
    }

    handleChange = (e) => {
        this.setState({
            word: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        this.getWord();
    }

    getWord = () => {
        const word = this.state.word || 'rigamarole';

        fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "fdb8e37511msh0d872b96cc99113p1d0b4ajsn803e011990b8"
	}
})
        .then(response => {
            if (response.ok){
                return response.json()
            }else {
                throw new Error('something went wrong...')
            }
            })
        .then(data => {
            this.setState( () => {
                return {
                data: [...this.state.data, data],
                word: '',
                loading: false,
                error: ''
                }
            })
        })
        .catch(error => {
            this.setState({
                error,
                loading: false,
                word: ''
            })
        });
    }

    render() {

        const allSynonyms = this.state.data && this.state.data.map((syn, index) => {
            return (
            <li className="list-group-item" key={index}>
                <h5>{syn && syn.word}</h5>
                <p>{syn.synonyms && "1: " + syn.synonyms[0]}</p>
                <p>{syn.synonyms && syn.synonyms[1] && "2: " + syn.synonyms[1]}</p>
                <p>{syn.synonyms && syn.synonyms[2] && "3: " + syn.synonyms[2]}</p>
            </li>
            );
        })

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.word} onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
                <p className="text-light">{this.state.loading && 'Loading...'}</p>
                <p className="text-light">{this.state.error && 'Word not found'}</p>
                <ul className="list-group">{allSynonyms}</ul>
            </div>
        )
    }
}

export default Synonyms
