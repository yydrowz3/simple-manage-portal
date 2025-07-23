function Profile() {
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse w-2/5">
                    <div className="card  bg-base-100 w-full shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <div className="avatar justify-center">
                                    <div className="w-1/3 rounded-full">
                                        <label
                                            htmlFor="avatar-input"
                                            className="cursor-pointer"
                                        >
                                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                                        </label>
                                    </div>
                                </div>
                                <input
                                    id="avatar-input"
                                    type="file"
                                    accept="image/*"
                                    // onChange={handleAvatarChange}
                                    className="hidden"
                                />
                                <label className="label">Diaplay Name</label>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Display Name"
                                    value="John Doe"
                                    disabled
                                />
                                <label className="label">Class In Charge</label>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Class ? | Year ?"
                                    value="Class 1 | Year 3"
                                    disabled
                                />
                                {/* <div>
                                    <a className="link link-hover">
                                        Forgot password?
                                    </a>
                                </div> */}
                                <button
                                    className="btn btn-neutral mt-4 "
                                    disabled
                                >
                                    Update Avatar
                                </button>
                                <button
                                    className="btn btn-neutral mt-4"
                                    onClick={() => window.history.back()}
                                >
                                    Back
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;
