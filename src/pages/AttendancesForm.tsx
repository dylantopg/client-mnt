import React, { useState } from 'react';

interface AttendanceFormData {
    employee_ci: string;
    check_in: string;
    check_out: string;
}

const AttendancesForm: React.FC = () => {
    const [formData, setFormData] = useState<AttendanceFormData>({
        employee_ci: '',
        check_in: '',
        check_out: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backend-mnt.onrender.com/api/attendances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Enviado con exito!');

                setFormData({ employee_ci: '', check_in: '', check_out: '' }); // Reset form
            } else {
                alert('Fallo al registrar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrio un error al enviar');
        }
    };

    return (
        <>
            <div className='container' >
                <h1>Registrar asistencia</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Codigo estudiantil:</label>
                        <input
                            type="text"
                            name="employee_ci"
                            value={formData.employee_ci}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Entrada:</label>
                        <input
                            type="datetime-local"
                            name="check_in"
                            value={formData.check_in}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Salida:</label>
                        <input
                            type="datetime-local"
                            name="check_out"
                            value={formData.check_out}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>

        </>

    );
};

export default AttendancesForm;
