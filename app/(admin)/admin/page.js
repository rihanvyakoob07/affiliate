import AdminNavBar from "./_components/AdminNavBar"
import Records from "./_components/Records"

function admin() {
    return (
        <div className=" text-[30px] text-black">
            <div>
                 <AdminNavBar />
            </div>
            <Records />
        </div>
    )
}

export default admin