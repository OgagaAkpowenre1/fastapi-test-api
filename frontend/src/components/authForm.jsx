const AuthForm =  () => {
    return (
        <>
            <form action="submit">
                <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="" />
                </div>

                <div>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="" />
                </div>
            </form>

            <button type="submit">Submit</button>
        </>
    )
}

export default AuthForm;