type TicketlistProps = {
    tickets: string[];
};

function Ticketlist ({ tickets }: TicketlistProps) {
    return (
        <div className="flex space-x-4 overflow-x-auto pb-4">
            {tickets.map ((ticket, index) => (
                <div
                    key={index}
                    className="min-w-[80px] text-center py-2 px-4 rounded-md font-semibold bg-orange-100 text-gray-800 shadow hover:bg-orange-200 transition"
                >
                    {ticket}
                </div>
            ))}
        </div>
    );
}

export default Ticketlist;