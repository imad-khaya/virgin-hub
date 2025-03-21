
import ActivityMap from '@/components/activity-map';

export default function Home() {
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Country Activity Dashboard</h1>
            <ActivityMap />
        </div>
    );
}