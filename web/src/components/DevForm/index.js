import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }){

    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    /**
     * Método para pegar a Geolocalização do usuário.
     */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        },
        (error) => {
            console.error(error);
        },
        {
            timeout: 30000,
        }
        );
    }, []);

    async function handleSubmit(e){

        /*
            Esse e.preventDefault desabilita o comportamento padrão do HTML 
            nesse caso o comportamento do form que iria mandar o usuário para 
            uma outra página quando ocorre um submit.
        */
        e.preventDefault();

        const newDev = {
            github_username : github_username,
            techs: techs,
            latitude : latitude,
            longitude : longitude
        }

        await onSubmit(newDev);

        // Limpando campos
        setGithubUsername('');
        setTechs('');
    }


    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
                name="github_username"
                id="github_username"
                required 
                value={github_username}
                onChange={e => setGithubUsername(e.target.value)}
            />
            </div>
            
            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
                name="techs"
                id="techs"
                required 
                value={techs}
                onChange={e => setTechs(e.target.value)}
            />
            </div>

            <div className="input-group">
            
            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input
                type="number"
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)} 
                />
            </div>

            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input 
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={ e => setLongitude(e.target.value)} 
                />
            </div>

            </div>

            <button type="submit">Salvar</button>        
        </form>
    );

}

export default DevForm;