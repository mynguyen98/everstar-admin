import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const tableExample = [
  {
    id: 1,
    avatar: { src: avatar1, status: 'success' },
    user: {
      title: 'actress',
      name: 'Mako Oda',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'USA' },
    usage: {
      value: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'success',
    },
    price: '500000 VND/month',
    activity: '10 sec ago',
  },
  {
    id: 2,
    avatar: { src: avatar2, status: 'danger' },
    user: {
      title: 'actress',
      name: 'Maria Ozawa',
      new: false,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Brazil' },
    usage: {
      value: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'info',
    },
    price: '500000 VND/month',
    activity: '5 minutes ago',
  },
  {
    id: 3,
    avatar: { src: avatar3, status: 'warning' },
    user: {
      title: 'actress',
      name: 'Quintin Ed',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'India' },
    usage: {
      value: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'warning',
    },
    price: '500000 VND/month',
    activity: '1 hour ago',
  },
  {
    id: 4,
    avatar: { src: avatar4, status: 'secondary' },
    user: {
      title: 'actress',
      name: 'Enéas Kwadwo',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'France' },
    usage: {
      value: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'danger',
    },
    price: '500000 VND/month',
    activity: 'Last month',
  },
  {
    id: 5,
    avatar: { src: avatar5, status: 'success' },
    user: {
      title: 'actress',
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Spain' },
    usage: {
      value: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'primary',
    },
    price: '500000 VND/month',
    activity: 'Last week',
  },
  {
    id: 6,
    avatar: { src: avatar6, status: 'danger' },
    user: {
      title: 'actress',
      name: 'Friderik Dávid',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Poland' },
    usage: {
      value: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'success',
    },
    price: '500000 VND/month',
    activity: 'Last week',
  },
  {
    id: 7,
    avatar: { src: avatar3, status: 'warning' },
    user: {
      title: 'actress',
      name: 'Quintin Ed',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'India' },
    usage: {
      value: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'warning',
    },
    price: '500000 VND/month',
    activity: '1 hour ago',
  },
  {
    id: 8,
    avatar: { src: avatar4, status: 'secondary' },
    user: {
      title: 'actress',
      name: 'Enéas Kwadwo',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'France' },
    usage: {
      value: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'danger',
    },
    price: '500000 VND/month',
    activity: 'Last month',
  },
  {
    id: 9,
    avatar: { src: avatar5, status: 'success' },
    user: {
      title: 'actress',
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Spain' },
    usage: {
      value: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'primary',
    },
    price: '500000 VND/month',
    activity: 'Last week',
  },
  {
    id: 10,
    avatar: { src: avatar6, status: 'danger' },
    user: {
      title: 'actress',
      name: 'Friderik Dávid',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Poland' },
    usage: {
      value: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'success',
    },
    price: '500000 VND/month',
    activity: 'Last week',
  },
  {
    id: 11,
    avatar: { src: avatar5, status: 'success' },
    user: {
      title: 'actress',
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Spain' },
    usage: {
      value: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'primary',
    },
    price: '500000 VND/month',
    activity: 'Last week',
  },
  {
    id: 12,
    avatar: { src: avatar6, status: 'danger' },
    user: {
      title: 'actress',
      name: 'Friderik Dávid',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Poland' },
    usage: {
      value: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'success',
    },
    price: '500000 VND/month',
    activity: 'Last week',
  },
  {
    id: 13,
    avatar: { src: avatar3, status: 'warning' },
    user: {
      title: 'actress',
      name: 'Quintin Ed',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'India' },
    usage: {
      value: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'warning',
    },
    price: '500000 VND/month',
    activity: '1 hour ago',
  },
  {
    id: 14,
    avatar: { src: avatar4, status: 'secondary' },
    user: {
      title: 'actress',
      name: 'Enéas Kwadwo',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'France' },
    usage: {
      value: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'danger',
    },
    price: '500000 VND/month',
    activity: 'Last month',
  },
  {
    id: 15,
    avatar: { src: avatar5, status: 'success' },
    user: {
      title: 'actress',
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Spain' },
    usage: {
      value: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'primary',
    },
    price: '500000 VND/month',
    activity: 'Last week',
  },
  {
    id: 16,
    avatar: { src: avatar6, status: 'danger' },
    user: {
      title: 'actress',
      name: 'Friderik Dávid',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Poland' },
    usage: {
      value: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'success',
    },
    price: '500000 VND/month',
    activity: 'Last week',
  },
]
export default tableExample
