import { useContext } from "react";
import CourseContext from "../context/CourseUserContext";


export const useUserCourse = () => {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error('useUserCourse must be used within a CourseUserProvider');
    }
    return context;
}


