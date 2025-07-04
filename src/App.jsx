    import React from 'react'
    import { BrowserRouter, Route, Routes } from 'react-router-dom'
    import Dashboard from './pages/Dashboard'
    import { Login } from './pages/Login'
    import Sidenav from './components/Sidenav'
    import Teachers from './pages/Teachers'
    import StudentPage from './pages/Student'
    import { ToastContainer } from 'react-toastify'

    function App() {
        return (
            <BrowserRouter>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"               
                />
                <Login>
                    <Sidenav>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/Teachers" element={<Teachers />} />
                            <Route path="/Student" element={<StudentPage />} />
                        </Routes>
                    </Sidenav>
                </Login>
            </BrowserRouter>
        )
    }

    export default App