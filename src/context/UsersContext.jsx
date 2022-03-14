import { createContext, useState, useEffect } from 'react'

const UsersContext = createContext()

// Provider a ser exportado
export const UsersProvider = ({ children }) => {

    // Definindo useState
    const [userData, setUserData] = useState([
        { id: 51253653003, name: 'Camila Souza', email: 'camila.souza@email.com', phone: '(11) 93463-2347', status: 'active' },
        { id: 39755382011, name: 'Pedro Ferreira', email: 'peferreira@email.com', phone: '(11) 95529-5678', status: 'inactive' },
        { id: 92181821020, name: 'Marcela Silva', email: 'masilva@email.com', phone: '(11) 93470-3391', status: 'waiting' },
        { id: 53327887039, name: 'Carlos Ferraz', email: 'carlosferraz@email.com', phone: '(11) 96744-0233', status: 'disabled' }
    ])

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('userData')))
    }, [])

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData))
    })


    const [newUserData, setNewUserData] = useState([
        {
            id: '',
            name: '',
            email: '',
            phone: '',
            status: 'Status'
        }
    ])


    // CREATE FUNCTION
    const createUser = (newUser) => {
        // newUser.id = uuidv4()
        console.log(newUser)
        setUserData([...userData, newUser])
    }

    // DELETE USER
    const deleteUser = (id) => {
        setUserData(userData.filter(item => item.id !== id))
    }

    // Update user item
    const updateUser = (id, updatedUser) => {
        setUserData(
            userData.map((item) => (item.id === id ? { ...item, ...updatedUser } : item))
        )
    }

    return <UsersContext.Provider value={{
        userData,
        setUserData,
        newUserData,
        setNewUserData,
        createUser,
        deleteUser,
        updateUser
    }}>
        {children}
    </UsersContext.Provider >
}

export default UsersContext