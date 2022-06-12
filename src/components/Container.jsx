import React from 'react';


const styles = {
    paperContainer: {
        height: 900,
   
        backgroundImage: `url(${"https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"})`
    }
};

export default class Home extends React.Component {
    render() {
        return (
            <div style={styles.paperContainer}>
            </div>
        )
    }
}
