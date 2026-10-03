
import { useEffect, useState } from "react";
import axios from "axios";

function CreateAnnouncement() {

    const [stages, setStages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fetchingStages, setFetchingStages] = useState(true);

    const [requirements, setRequirements] = useState([""]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "drama",
        stage: "",
        applicationDeadline: "",
        isOpen: true
    });


    // =================================
    // GET ALL STAGES
    // =================================

    const fetchStages = async () => {

        try {

            setFetchingStages(true);

            const response = await axios.get(
                "http://localhost:3000/api/stages",
                {
                    withCredentials: true
                }
            );

            setStages(response.data.stages || []);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to load stages"
            );

        } finally {

            setFetchingStages(false);

        }
    };


    useEffect(() => {
        fetchStages();
    }, []);


    // =================================
    // INPUT CHANGE
    // =================================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };


    // =================================
    // REQUIREMENTS
    // =================================

    const handleRequirementChange = (index, value) => {

        const updated = [...requirements];

        updated[index] = value;

        setRequirements(updated);

    };


    const addRequirement = () => {

        setRequirements((prev) => [...prev, ""]);

    };


    const removeRequirement = (index) => {

        setRequirements((prev) =>
            prev.filter((_, i) => i !== index)
        );

    };


    // =================================
    // SUBMIT ANNOUNCEMENT
    // =================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.stage) {
            alert("Please select a stage");
            return;
        }

        const selectedStage = stages.find(
            (item) => item._id === formData.stage
        );

        if (!selectedStage) {
            alert("Selected stage was not found");
            return;
        }

        const cleanRequirements = requirements
            .map((item) => item.trim())
            .filter(Boolean);

        if (new Date(formData.applicationDeadline) <= new Date()) {
            alert("Application deadline must be in the future");
            return;
        }

        try {

            setLoading(true);

            const payload = {
                ...formData,

                // Send stage ObjectId
                stage: selectedStage._id,

                // Send requirements as an array
                requirements: cleanRequirements,

                // Convert datetime to ISO format
                applicationDeadline: new Date(
                    formData.applicationDeadline
                ).toISOString()
            };

            const response = await axios.post(
                "http://localhost:3000/api/announcements",
                payload,
                {
                    withCredentials: true
                }
            );

            alert(
                response.data.message ||
                "Announcement created successfully"
            );

            // Reset form
            setFormData({
                title: "",
                description: "",
                type: "drama",
                stage: "",
                applicationDeadline: "",
                isOpen: true
            });

            setRequirements([""]);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create announcement"
            );

        } finally {

            setLoading(false);

        }
    };


    // =================================
    // UI
    // =================================

    return (

        <div className="min-h-screen bg-gray-100 p-4 md:p-8">

            <div className="mx-auto max-w-5xl">

                <div className="rounded-2xl bg-white p-5 shadow-sm md:p-8">

                    {/* HEADER */}

                    <div className="mb-8 border-b pb-5">

                        <h1 className="text-2xl font-bold text-gray-900">
                            Create Announcement
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Publish a new stage announcement for students.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* TITLE */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Announcement Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter announcement title"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Write announcement details..."
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                required
                            />

                        </div>


                        {/* TYPE + STAGE */}

                        <div className="grid gap-5 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Announcement Type
                                </label>

                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                >

                                    <option value="drama">
                                        Drama
                                    </option>

                                    <option value="stage">
                                        Stage
                                    </option>

                                    <option value="event">
                                        Event
                                    </option>

                                    <option value="audition">
                                        Audition
                                    </option>

                                </select>

                            </div>


                            {/* STAGE SELECT */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Select Stage
                                </label>

                                <select
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                    disabled={fetchingStages}
                                >

                                    <option value="">
                                        {fetchingStages
                                            ? "Loading stages..."
                                            : "Select a stage"}
                                    </option>

                                    {stages.map((stage) => (

                                        <option
                                            key={stage._id}
                                            value={stage._id}
                                        >
                                            {stage.title} — {stage.location}
                                        </option>

                                    ))}

                                </select>

                                {!fetchingStages && stages.length === 0 && (

                                    <p className="mt-2 text-sm text-red-500">
                                        No stages found. Create a stage first.
                                    </p>

                                )}

                            </div>

                        </div>


                        {/* SELECTED STAGE PREVIEW */}

                        {formData.stage && (

                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                                <h3 className="mb-2 font-semibold text-blue-900">
                                    Selected Stage
                                </h3>

                                {(() => {

                                    const selected = stages.find(
                                        (item) => item._id === formData.stage
                                    );

                                    if (!selected) return null;

                                    return (

                                        <div className="space-y-1 text-sm text-blue-800">

                                            <p>
                                                <strong>Title:</strong> {selected.title}
                                            </p>

                                            <p>
                                                <strong>Location:</strong> {selected.location}
                                            </p>

                                            <p>
                                                <strong>Status:</strong> {selected.status}
                                            </p>

                                        </div>

                                    );

                                })()}

                            </div>

                        )}


                        {/* APPLICATION DEADLINE */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Application Deadline
                            </label>

                            <input
                                type="datetime-local"
                                name="applicationDeadline"
                                value={formData.applicationDeadline}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                required
                            />

                        </div>


                        {/* REQUIREMENTS */}

                        <div>

                            <div className="mb-3 flex items-center justify-between">

                                <label className="text-sm font-medium text-gray-700">
                                    Student Requirements
                                </label>

                                <button
                                    type="button"
                                    onClick={addRequirement}
                                    className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                                >
                                    + Add Requirement
                                </button>

                            </div>


                            <div className="space-y-3">

                                {requirements.map((requirement, index) => (

                                    <div
                                        key={index}
                                        className="flex gap-2"
                                    >

                                        <input
                                            type="text"
                                            value={requirement}
                                            onChange={(e) =>
                                                handleRequirementChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Requirement ${index + 1}`}
                                            className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeRequirement(index)
                                            }
                                            disabled={requirements.length === 1}
                                            className="rounded-lg border border-red-200 px-4 text-red-500 hover:bg-red-50 disabled:opacity-30"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* APPLICATION STATUS */}

                        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">

                            <div>

                                <h3 className="font-medium text-gray-800">
                                    Applications Open
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Allow students to apply for this announcement.
                                </p>

                            </div>

                            <input
                                type="checkbox"
                                name="isOpen"
                                checked={formData.isOpen}
                                onChange={handleChange}
                                className="h-5 w-5 cursor-pointer accent-blue-600"
                            />

                        </div>


                        {/* SUBMIT */}

                        <div className="flex justify-end border-t pt-5">

                            <button
                                type="submit"
                                disabled={loading || fetchingStages || stages.length === 0}
                                className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {loading
                                    ? "Publishing..."
                                    : "Create Announcement"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default CreateAnnouncement;
