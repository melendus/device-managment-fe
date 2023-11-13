import DeleteIcon from '@mui/icons-material/Delete';
import {removeUser, removeUserAndDevices} from "../services/UserApi";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {updateCurrentUsers} from "../redux/slices/UserSlice";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
export const getActionsUser = () => {
    const clickedUser = useAppSelector((state) => state.clickedUser);
    const currentStateUsers = useAppSelector((state) => state.currentUser);

    const dispatch = useAppDispatch();

    const currentUsers = currentStateUsers.currentUsers;

    const deleteTheUser = async () => {
        await removeUser(clickedUser.userId.toString());
        const updatedUserList = currentUsers.filter(user => user.id !== clickedUser.userId);

        dispatch(updateCurrentUsers(updatedUserList));
    };

    const deleteUserAndDevices = async () => {
        await removeUserAndDevices(clickedUser.userId.toString());

        const updatedUserList = currentUsers.filter(user => user.id !== clickedUser.userId);

        dispatch(updateCurrentUsers(updatedUserList));
    }

    const Options = {
        removeUser: {
            optionName: 'Remove User',
            optionLogo: <DeleteIcon />,
            optionOnClick: async () => {
                await deleteTheUser();
            },
        },
        removeUserAndDevices: {
            optionName: 'Remove User and Devices',
            optionLogo: <DeleteSweepIcon/>,
            optionOnClick: async () => deleteUserAndDevices()
        }
    }

    return [Options.removeUser, Options.removeUserAndDevices]


    // invitePeople: {
    //     optionName: i18n.t<string>('common:invitePeople'),
    //     optionLogo: <GroupAddIcon />,
    //     optionOnClick: async () => {
    //         invitePeople();
    //     },
    // },
    // rescheduleMeeting: {
    //     optionName: i18n.t<string>('common:rescheduleMeeting'),
    //     optionLogo: <RestoreIcon />,
    //     optionOnClick: async () => {
    //         reschedule();
    //     },
    // },
    // cancelMeeting: {
    //     optionName: i18n.t<string>('common:cancelMeeting'),
    //     optionLogo: <CancelOutlinedIcon />,
    //     optionOnClick: async () => {
    //         setConfirmationModalHeaderText(i18n.t<string>('caseStudies:cancelMeetingHeader'));
    //         setConfirmationModalMessageText(i18n.t<string>('caseStudies:cancelMeetingMessage'));
    //         setActionNeedingConfirmation(() => cancelMeeting);
    //         setIsConfirmationModalOpen(true);
    //     },
    // },
    // cancelParticipation: {
    //     optionName: i18n.t<string>('common:cancelParticipation'),
    //     optionLogo: <CancelOutlinedIcon />,
    //     optionOnClick: async () => {
    //         setConfirmationModalHeaderText(i18n.t<string>('caseStudies:cancelParticipationHeader'));
    //         setConfirmationModalMessageText(i18n.t<string>('caseStudies:cancelParticipationMessage'));
    //         setActionNeedingConfirmation(() => cancelParticipation);
    //         setIsConfirmationModalOpen(true);
    //     },
    // },
    // leaveCase: {
    //     optionName: i18n.t<string>('common:leaveTumorBoard'),
    //     optionLogo: <RemoveCircleIcon />,
    //     optionOnClick: async () => {
    //         setConfirmationModalHeaderText(i18n.t<string>('caseStudies:leaveTumorBoardHeader'));
    //         setConfirmationModalMessageText(i18n.t<string>('caseStudies:leaveTumorBoardMessage'));
    //         setActionNeedingConfirmation(() => leaveCase);
    //         setIsConfirmationModalOpen(true);
    //     },
    // },
    // completeCase: {
    //     optionName: i18n.t<string>('caseStudies:completeTB'),
    //     optionLogo: <CheckOutlinedIcon />,
    //     optionOnClick: async () => {
    //         setConfirmationModalHeaderText(i18n.t<string>(`caseStudies:closeTumorBoardHeader`));
    //         setConfirmationModalMessageText(i18n.t<string>(`caseStudies:closeTumorBoardMessage`));
    //         setActionNeedingConfirmation(() => completeCase);
    //         setIsConfirmationModalOpen(true);
    //     },
    // },
};