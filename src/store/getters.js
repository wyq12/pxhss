const getters = {
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    access: state => state.user.access,
    new: state => state.message.new,
    read: state => state.message.read,
    caseNo: state => state.search.caseNo
};
export default getters;
