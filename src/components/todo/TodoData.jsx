const TodoData = (props) => {
    // props là một object {}
    // {
    //     name: "Khac",
    //     age: 25,
    //     data: {}
    // }
    const {name, age, data} = props; // object destructuring
    // const name = props.name;
    // const age = props.age;
    // const data = props.data
    console.log(" >>> check props: ", props)
    return (
    <div className='todo-data'>
        <div>My name is {props.name}</div>
        <div>learning reactjs</div>
        <div>learning reactjs</div>
    </div>
    );
};

export default TodoData;