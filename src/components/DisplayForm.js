import React from 'react';

const DisplayForm = (props) => {
    
    const {setRenderOptions} = props.AppMethods;
    
    const handleChange = (e) => {
        e.preventDefault();

        let octave = parseInt(document.getElementById("display-form-octave").value)
        let type = document.getElementById("display-form-type").value.toLowerCase()
        let playback = document.getElementById("display-form-playback").value.toLowerCase()
        let playbackSpeed = document.getElementById("display-form-speed");
        if(playbackSpeed) playbackSpeed = playbackSpeed.value.toLowerCase();
        
        setRenderOptions({
            octave, 
            type,
            playback,
            playbackSpeed
        })

    }


    return(
        <section id="display">
            <h2 className="section-title">Display & Playback Settings</h2>
            <form id="display-form" onChange={handleChange}>
                
                <h3>Display</h3>

                <label>Octave Offset</label><br/>
                <input type="number" id="display-form-octave" min="0" max="12" defaultValue="4"/><br/>
                
                <label>Display Type</label><br/>
                <select id="display-form-type">
                    <option>Standard</option>
                    <option>Compact</option>
                    <option>Scale</option>
                </select>

                <br/>

                <h3>Playback</h3>
                <label>Playback</label><br/>
                <select id="display-form-playback">
                    <option>Arpeggiated</option>
                    <option>Block</option>
                </select>

                {
                    props.state.renderOptions.playback === "arpeggiated" &&
                    <div>
                        <label>Playback Speed</label><br/>
                        <select id="display-form-speed" defaultValue="Medium">
                            <option>Slow</option>
                            <option>Medium</option>
                            <option>Fast</option>
                        </select>
                    </div>
                }

            </form>

        </section>
    )

}

export default DisplayForm;