import { useState, useEffect } from 'react'
import { TrendingUp, AlertCircle, CheckCircle2, Clock, MapPin, Phone, Wrench } from 'lucide-react'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [selectedShipment, setSelectedShipment] = useState(null)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  const metrics = [
    { label: 'Active Shipments', value: 12, icon: '📦', color: 'secondary' },
    { label: 'Delayed Shipments', value: 2, icon: '⚠️', color: 'accent' },
    { label: 'Deliveries Today', value: 8, icon: '✓', color: 'green-600' },
    { label: 'Vehicles Transit', value: 5, icon: '🚚', color: 'blue-600' },
  ]

  const shipments = [
    {
      id: 1,
      reference: 'SHP-001-MARA',
      destination: 'Maasai Mara',
      status: 'on-time',
      progress: 75,
      eta: '2 hours',
      driver: 'Joseph Kipchoge',
      vehicle: 'LC 123Z',
      priority: 'high',
    },
    {
      id: 2,
      reference: 'SHP-002-DIAN',
      destination: 'Diani Beach',
      status: 'delayed',
      progress: 45,
      eta: '4 hours',
      driver: 'Mary Kamau',
      vehicle: 'HI 456A',
      priority: 'critical',
    },
    {
      id: 3,
      reference: 'SHP-003-MOUN',
      destination: 'Mount Kenya',
      status: 'on-time',
      progress: 85,
      eta: '1 hour',
      driver: 'David Omondi',
      vehicle: 'TC 789B',
      priority: 'normal',
    },
    {
      id: 4,
      reference: 'SHP-004-LAKE',
      destination: 'Lake Nakuru',
      status: 'on-time',
      progress: 60,
      eta: '3 hours',
      driver: 'Grace Muthoni',
      vehicle: 'NV 321C',
      priority: 'normal',
    },
  ]

  const alerts = [
    {
      id: 1,
      type: 'delay',
      message: 'Shipment SHP-002-DIAN running 2 hours behind schedule',
      time: '30 mins ago',
      severity: 'critical',
    },
    {
      id: 2,
      type: 'maintenance',
      message: 'Vehicle LC 123Z due for maintenance in 50km',
      time: '1 hour ago',
      severity: 'warning',
    },
    {
      id: 3,
      type: 'route',
      message: 'Traffic alert on Nairobi-Mara route. ETA increased by 45 mins',
      time: '2 hours ago',
      severity: 'info',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'text-green-600 bg-green-50'
      case 'delayed':
        return 'text-red-600 bg-red-50'
      case 'at-risk':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-l-red-500 bg-red-50'
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50'
      case 'info':
        return 'border-l-blue-500 bg-blue-50'
      default:
        return 'border-l-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="page-enter min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-2">Operator Dashboard</h1>
          <p>Real-time logistics and shipment management</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-32 skeleton" />
            ))
          ) : (
            metrics.map((metric, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 card-enter hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{metric.icon}</span>
                  <TrendingUp className={`text-${metric.color}`} size={20} />
                </div>
                <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
                <p className="text-3xl font-black text-primary">{metric.value}</p>
              </div>
            ))
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipments List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipments Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden card-enter">
              <div className="p-6 border-b bg-gray-50">
                <h2 className="text-2xl font-black text-primary">Active Shipments</h2>
              </div>

              {loading ? (
                <div className="p-6 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded skeleton" />
                  ))}
                </div>
              ) : (
                <div className="divide-y">
                  {shipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      onClick={() => setSelectedShipment(shipment)}
                      className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                        shipment.status === 'delayed'
                          ? 'border-l-red-500 bg-red-50/30'
                          : 'border-l-green-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-primary">{shipment.reference}</h4>
                          <p className="text-sm text-gray-600">{shipment.destination}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(shipment.status)}`}>
                          {shipment.status === 'on-time' ? '✓ On Time' : '⚠️ Delayed'}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-gray-600">Progress</span>
                          <span className="text-xs font-bold text-gray-900">{shipment.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              shipment.status === 'delayed' ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">Driver: <span className="font-semibold">{shipment.driver}</span></span>
                          <span className="text-gray-600">Vehicle: <span className="font-semibold">{shipment.vehicle}</span></span>
                        </div>
                        <span className="text-gray-900 font-bold">ETA: {shipment.eta}</span>
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-4 flex gap-2">
                        <button className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded hover:bg-secondary/20 transition-colors">
                          Update Status
                        </button>
                        <button className="px-3 py-1 text-xs bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors">
                          Contact Driver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden card-enter">
              <div className="p-6 border-b bg-gray-50">
                <h2 className="text-2xl font-black text-primary">Recent Activity</h2>
              </div>
              <div className="divide-y max-h-64 overflow-y-auto">
                {[
                  { time: '5 mins ago', activity: 'SHP-001-MARA arrived at checkpoint' },
                  { time: '15 mins ago', activity: 'SHP-003-MOUN departed from Nairobi' },
                  { time: '25 mins ago', activity: 'SHP-002-DIAN rerouted due to traffic' },
                  { time: '45 mins ago', activity: 'SHP-004-LAKE on schedule' },
                ].map((log, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50">
                    <div className="flex gap-3">
                      <Clock size={16} className="text-gray-500 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{log.activity}</p>
                        <p className="text-xs text-gray-600">{log.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts & Actions Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden card-enter">
              <div className="p-6 border-b bg-gray-50">
                <h2 className="text-lg font-black text-primary flex items-center gap-2">
                  <AlertCircle size={20} />
                  Alerts & Notifications
                </h2>
              </div>

              {loading ? (
                <div className="p-6 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded skeleton" />
                  ))}
                </div>
              ) : (
                <div className="divide-y max-h-96 overflow-y-auto">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 border-l-4 ${getSeverityColor(alert.severity)}`}
                    >
                      <div className="flex gap-2 items-start">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{alert.message}</p>
                          <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 card-enter space-y-3">
              <h3 className="font-black text-primary mb-4">Quick Actions</h3>
              <button className="w-full px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 font-semibold transition-colors text-sm">
                Assign Shipment
              </button>
              <button className="w-full px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 font-semibold transition-colors text-sm">
                Update Delivery Status
              </button>
              <button className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 font-semibold transition-colors text-sm flex items-center justify-center gap-2">
                <Wrench size={16} />
                Maintenance Alert
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors text-sm">
                View Route Map
              </button>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl p-6 card-enter">
              <h3 className="font-black text-primary mb-4">Performance</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">On-Time Delivery Rate</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-green-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-900 mt-1">94%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Fleet Utilization</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-blue-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-900 mt-1">83%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Driver Satisfaction</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-5/6 bg-yellow-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-900 mt-1">88%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
