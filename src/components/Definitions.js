import React, { Component } from 'react'

export class Definitions extends Component {
    state = {
        word: '',
        data: []
    }

    handleChange = (e) => {
        this.setState({
            word: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getWord();
    }

    getWord = () => {
        const word = this.state.word || 'rigamarole';

        fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "fdb8e37511msh0d872b96cc99113p1d0b4ajsn803e011990b8"
	}
})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState( () => {
                return {
                data: [...this.state.data, data]
                }
            })
        })
    }
    render() {

        const allDefs = this.state.data && this.state.data.map(def => {
            return (
            <li className="list-group-item">
                <h5>{def.word}</h5>
                <p>{def.definitions && def.definitions[0].partOfSpeech}</p>
                <p>{def.definitions && def.definitions[0].definition}</p>
            </li>
            );
        })

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.word} onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
                <ul className="list-group">{allDefs}</ul>
            </div>
        )
    }
}

export default Definitions
