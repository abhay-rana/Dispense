import Dispense from './components/dispense';

const App = () => {
    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="text-center text-18 font-bold">
                    Dispense Component
                </div>
                <div className="p-4">
                    <Dispense />
                </div>
            </div>
        </>
    );
};

export default App;
