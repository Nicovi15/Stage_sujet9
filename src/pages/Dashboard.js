import React from 'react'

export const Dashboard = props => {
    return (
        <div>
            <h1>Dashboard de l'étudiant une fois qu'il est connecté</h1>
            <h1>Status:{props.loggedInStatus}</h1>
            <h2>Bienvenue {props.user.pseudo}</h2>

        </div>
    );
}
