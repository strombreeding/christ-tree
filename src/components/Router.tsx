import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                {/* 로그인이 필요한 페이지 */}
                {/* <Route element={<PrivateRoute />}>
                </Route> */}
                {/* 로그인 시 접근이 불가능한 페이지 */}
                {/* <Route element={<PublicRoute />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
