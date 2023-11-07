// class HelloWorld extends React.Component {

//     render() {
//         const continents = ['Africa', 'American', 'Asia', 'Australia', 'Europe'];
//         const helloContinents = Array.from(continents, c => `Hello ${c}!`);
//         const message = helloContinents.join(' ');
//         return (
//             <div title="Outer div">
//                 <h1>{message}</h1>
//             </div>
//         )
//     }
// }


// const element = <HelloWorld />; //instance of helloworld


// ReactDOM.render(element, document.getElementById('contents'));

class IssueFilter extends React.Component {
    render() {
        return (
            <div>
                This is a placeholder for the issue filter.
            </div>
        )
    }
}

class IssueTable extends React.Component {
    render() {
        return (
            <div>
                This is a placeholder for the issue Table.
            </div>
        )
    }
}

class IssueAdd extends React.Component {
    render() {
        return (
            <div>
                This is a placeholder for the issue Add.
            </div>
        )
    }
}

class IssueList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </React.Fragment>
        )
    }
}

const element = <IssueList />
ReactDOM.render(element, document.getElementById('contents'));
