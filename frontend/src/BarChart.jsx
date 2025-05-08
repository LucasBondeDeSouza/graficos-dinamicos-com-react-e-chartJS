import React, { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, LinearScale, BarElement, scales } from "chart.js"

ChartJS.register(LinearScale, BarElement)

export default () => {
    const [arrVendasMensais, setArrVendasMensais] = useState([])

    useEffect(() => {
        const pegarInfosAPI = async () => {
            try {
                const respostaFetch = await fetch('http://localhost:3000/vendas')
                const jsonRespostaFetch = await respostaFetch.json()

                setArrVendasMensais(jsonRespostaFetch)
            } catch (err) {
                coonsole.log('Deu erro', err)
            }
        }

        pegarInfosAPI()
    }, [])

    const data = {
        datasets: [
            {
                label: 'Vendas Mensais',
                data: arrVendasMensais,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                parsing: {
                    xAxisKey: 'mes',
                    yAxisKey: 'valorVendido'
                }
            }
        ]
    }
    
    const chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 1
            },
            y: {
                beginAtZero: true,
            },
        }
    }

    return (
        <Bar data={data} options={chartOptions} />
    )
}