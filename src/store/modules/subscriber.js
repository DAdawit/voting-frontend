import store from '../../store'
import axios from 'axios'

store.subscribe((mutation)=>{
    switch(mutation.type){
        case "SET_TOKEN":
            if(mutation.payload){
                console.log(mutation.payload)
                axios.defaults.headers.common['Authorization'] =`Bearer ${mutation.payload}`
                localStorage.setItem('token',mutation.payload)
            }else{
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break; 
        }

        switch(mutation.type){
            case 'SET_ROLE':
            if(mutation.payload){
                console.log(mutation.payload)
                axios.defaults.headers.common['Authorization'] =`Bearer ${mutation.payload}`
                localStorage.setItem('role',mutation.payload)
            }else{
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('role')
            }
            break; 
        }
})



