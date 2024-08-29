import { useState } from 'react';

const RegisterEmployee = () => {
    const [unique_ci, setUniqueCi] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [cel, setCel] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('https://backend-mnt.onrender.com/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ unique_ci, name, department, cel }),
        });

        if (response.ok) {
            alert('Employee registered successfully!');
            // Reset form or handle success
        } else {
            alert('Failed to register employee.');
        }
    };

    return (
        <>
            <div className='container'>
                <h1>Registro de monitor</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>CI:</label>
                        <input type="text" value={unique_ci} onChange={(e) => setUniqueCi(e.target.value)} required />
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Dependencia:</label>
                        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
                    </div>
                    <div>
                        <label>Cel:</label>
                        <input type="number" value={cel} onChange={(e) => setCel(e.target.value)} />
                    </div>
                    <button type="submit">Registrar</button>
                </form>
            </div>

        </>

    );
};

export default RegisterEmployee;