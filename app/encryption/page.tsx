"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Key,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  BookOpen,
  Cpu,
  Globe,
} from "lucide-react"

const encryptionMethods = [
  {
    name: "AES-256-GCM",
    description: "Advanced Encryption Standard with 256-bit key",
    status: "active",
    strength: 100,
    type: "Symmetric",
  },
  {
    name: "RSA-4096",
    description: "RSA encryption with 4096-bit key",
    status: "active",
    strength: 95,
    type: "Asymmetric",
  },
  {
    name: "ECDH P-521",
    description: "Elliptic Curve Diffie-Hellman key exchange",
    status: "active",
    strength: 98,
    type: "Key Exchange",
  },
  {
    name: "ChaCha20-Poly1305",
    description: "Stream cipher with authentication",
    status: "available",
    strength: 92,
    type: "Symmetric",
  },
]

const keyManagement = [
  {
    id: 1,
    name: "Primary Encryption Key",
    type: "AES-256",
    created: "2024-01-01",
    expires: "2025-01-01",
    status: "active",
    usage: "Message Encryption",
  },
  {
    id: 2,
    name: "Key Exchange Key",
    type: "ECDH P-521",
    created: "2024-01-01",
    expires: "2025-01-01",
    status: "active",
    usage: "Key Exchange",
  },
  {
    id: 3,
    name: "Backup Key",
    type: "AES-256",
    created: "2023-12-15",
    expires: "2024-12-15",
    status: "backup",
    usage: "Backup & Recovery",
  },
]

export default function EncryptionPage() {
  const [autoKeyRotation, setAutoKeyRotation] = useState(true)
  const [perfectForwardSecrecy, setPerfectForwardSecrecy] = useState(true)
  const [quantumResistant, setQuantumResistant] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "backup":
        return "bg-primary-100 text-primary-800"
      case "available":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStrengthColor = (strength: number) => {
    if (strength >= 95) return "bg-green-500"
    if (strength >= 85) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
        <AppSidebar />

        <div className="flex-1 flex flex-col h-screen w-full overflow-hidden">
          <div className="flex-1 w-full h-full overflow-auto p-6">
            {/* Remove max-w-6xl and mx-auto for full width */}
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary-900">Encryption & Security</h1>
                <p className="text-primary-700">Advanced cryptographic protection and security protocols</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 px-3 py-1">
                  <Shield className="w-3 h-3 mr-1" />
                  Military-Grade Encrypted
                </Badge>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6 h-full">
              <TabsList className="grid w-full grid-cols-5 bg-white border border-primary-200">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="methods"
                  className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                >
                  Methods
                </TabsTrigger>
                <TabsTrigger value="keys" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
                  Key Management
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                >
                  Learn
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-primary-200 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg text-primary-900">
                        <Shield className="w-5 h-5 mr-2 text-green-500" />
                        Encryption Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-700">End-to-End</span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-700">Message Encryption</span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-700">File Encryption</span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-700">Metadata Protection</span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary-200 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg text-primary-900">
                        <Key className="w-5 h-5 mr-2 text-primary-600" />
                        Key Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-700">Active Keys</span>
                          <span className="font-medium text-primary-900">3</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-700">Key Strength</span>
                          <span className="font-medium text-primary-900">256-bit</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-700">Last Rotation</span>
                          <span className="font-medium text-primary-900">2 days ago</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary-700">Next Rotation</span>
                          <span className="font-medium text-primary-900">28 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary-200 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg text-primary-900">
                        <Zap className="w-5 h-5 mr-2 text-purple-500" />
                        Security Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">98%</div>
                          <p className="text-sm text-primary-700">Overall Security</p>
                        </div>
                        <Progress value={98} className="h-3" />
                        <div className="flex items-center justify-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">Excellent Security</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6 border-primary-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-primary-900">
                      <Info className="w-5 h-5 mr-2" />
                      Current Security Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-primary-900">Active Encryption</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-primary-700">
                            <strong>Algorithm:</strong> AES-256-GCM
                          </p>
                          <p className="text-primary-700">
                            <strong>Key Exchange:</strong> ECDH P-521
                          </p>
                          <p className="text-primary-700">
                            <strong>Hash Function:</strong> SHA-256
                          </p>
                          <p className="text-primary-700">
                            <strong>Forward Secrecy:</strong> Enabled
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-primary-900">Security Features</h4>
                        <div className="space-y-2 text-sm text-primary-700">
                          <p>✓ End-to-end encryption</p>
                          <p>✓ Perfect forward secrecy</p>
                          <p>✓ Automatic key rotation</p>
                          <p>✓ Zero-knowledge architecture</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education">
                <div className="space-y-6">
                  <Card className="border-primary-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Understanding Cryptography
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-primary-900">AES-256 Encryption</h3>
                          <p className="text-primary-700 text-sm leading-relaxed">
                            The Advanced Encryption Standard (AES) with 256-bit keys is a symmetric encryption algorithm
                            adopted by the U.S. government and used worldwide. AES-256 provides exceptional security
                            with 2^256 possible key combinations, making it virtually impossible to break with current
                            technology.
                          </p>
                          <div className="bg-primary-50 p-4 rounded-lg">
                            <h4 className="font-medium text-primary-900 mb-2">Key Features:</h4>
                            <ul className="text-sm text-primary-700 space-y-1">
                              <li>• 256-bit key length</li>
                              <li>• 14 rounds of encryption</li>
                              <li>• Symmetric key algorithm</li>
                              <li>• NSA approved for TOP SECRET</li>
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-primary-900">RSA Encryption</h3>
                          <p className="text-primary-700 text-sm leading-relaxed">
                            RSA is an asymmetric cryptographic algorithm that uses a pair of keys: a public key for
                            encryption and a private key for decryption. Our implementation uses 4096-bit keys,
                            providing robust security for key exchange and digital signatures.
                          </p>
                          <div className="bg-primary-50 p-4 rounded-lg">
                            <h4 className="font-medium text-primary-900 mb-2">Key Features:</h4>
                            <ul className="text-sm text-primary-700 space-y-1">
                              <li>• 4096-bit key length</li>
                              <li>• Public-private key pairs</li>
                              <li>• Digital signature support</li>
                              <li>• Secure key exchange</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900">
                        <Cpu className="w-5 h-5 mr-2" />
                        Advanced Cryptographic Techniques
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-primary-900">Elliptic Curve Cryptography</h4>
                          <p className="text-sm text-primary-700">
                            ECDH (Elliptic Curve Diffie-Hellman) provides the same security as RSA but with smaller key
                            sizes, making it more efficient for mobile devices and real-time communication.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-primary-900">Perfect Forward Secrecy</h4>
                          <p className="text-sm text-primary-700">
                            Each conversation uses unique session keys that are deleted after use. Even if long-term
                            keys are compromised, past communications remain secure.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-primary-900">Zero-Knowledge Architecture</h4>
                          <p className="text-sm text-primary-700">
                            Our servers never have access to your encryption keys or message content. All encryption and
                            decryption happens on your device.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-primary-900">
                        <Globe className="w-5 h-5 mr-2" />
                        Future: Blockchain Integration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-primary-900 mb-3">Planned Blockchain Features</h3>
                        <p className="text-primary-700 mb-4">
                          HashChat is planning to integrate blockchain technology to provide additional security layers
                          and decentralized features for our users.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium text-primary-900">Decentralized Key Management</h4>
                            <p className="text-sm text-primary-700">
                              Store encryption keys on a distributed blockchain network, eliminating single points of
                              failure.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium text-primary-900">Immutable Message Verification</h4>
                            <p className="text-sm text-primary-700">
                              Use blockchain to create tamper-proof message integrity verification.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium text-primary-900">Smart Contract Automation</h4>
                            <p className="text-sm text-primary-700">
                              Automate security protocols and key rotation using smart contracts.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium text-primary-900">Decentralized Identity</h4>
                            <p className="text-sm text-primary-700">
                              Enable users to control their identity without relying on centralized authorities.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">Coming Soon</span>
                          </div>
                          <p className="text-sm text-yellow-700 mt-1">
                            Blockchain integration is currently in development and will be available in future releases.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Methods Tab */}
              <TabsContent value="methods">
                <div className="space-y-4">
                  {encryptionMethods.map((method, index) => (
                    <Card key={index} className="border-primary-200 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-primary-900">{method.name}</h3>
                              <Badge className={getStatusColor(method.status)}>{method.status}</Badge>
                              <Badge variant="outline" className="border-primary-300 text-primary-700">
                                {method.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-primary-700 mb-3">{method.description}</p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-primary-700">Strength:</span>
                                <div className="w-32 bg-primary-100 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${getStrengthColor(method.strength)}`}
                                    style={{ width: `${method.strength}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-primary-900">{method.strength}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {method.status === "active" ? (
                              <Button variant="outline" size="sm" className="border-primary-300 text-primary-700">
                                <Lock className="w-4 h-4 mr-2" />
                                Active
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
                                <Unlock className="w-4 h-4 mr-2" />
                                Enable
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Key Management Tab */}
              <TabsContent value="keys">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-primary-900">Encryption Keys</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-50">
                        <Download className="w-4 h-4 mr-2" />
                        Export Keys
                      </Button>
                      <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-50">
                        <Upload className="w-4 h-4 mr-2" />
                        Import Keys
                      </Button>
                      <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Generate New Key
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {keyManagement.map((key) => (
                      <Card key={key.id} className="border-primary-200 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-primary-900">{key.name}</h4>
                                <Badge className={getStatusColor(key.status)}>{key.status}</Badge>
                                <Badge variant="outline" className="border-primary-300 text-primary-700">
                                  {key.type}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-primary-600">Usage:</span>
                                  <p className="font-medium text-primary-900">{key.usage}</p>
                                </div>
                                <div>
                                  <span className="text-primary-600">Created:</span>
                                  <p className="font-medium text-primary-900">{key.created}</p>
                                </div>
                                <div>
                                  <span className="text-primary-600">Expires:</span>
                                  <p className="font-medium text-primary-900">{key.expires}</p>
                                </div>
                                <div>
                                  <span className="text-primary-600">Status:</span>
                                  <p className="font-medium text-primary-900 capitalize">{key.status}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-primary-300 text-primary-700 hover:bg-primary-50"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-primary-300 text-primary-700 hover:bg-primary-50"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card className="border-primary-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-primary-900">Encryption Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-primary-900">Automatic Key Rotation</h4>
                          <p className="text-sm text-primary-700">Automatically rotate encryption keys every 30 days</p>
                        </div>
                        <Switch checked={autoKeyRotation} onCheckedChange={setAutoKeyRotation} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-primary-900">Perfect Forward Secrecy</h4>
                          <p className="text-sm text-primary-700">Generate new keys for each conversation</p>
                        </div>
                        <Switch checked={perfectForwardSecrecy} onCheckedChange={setPerfectForwardSecrecy} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-primary-900">Quantum-Resistant Encryption</h4>
                          <p className="text-sm text-primary-700">Use post-quantum cryptography algorithms</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs text-yellow-600">Experimental feature</span>
                          </div>
                        </div>
                        <Switch checked={quantumResistant} onCheckedChange={setQuantumResistant} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-primary-900">Advanced Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-primary-300 text-primary-700 hover:bg-primary-50"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Force Key Rotation Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-primary-300 text-primary-700 hover:bg-primary-50"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Security Audit Log
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-primary-300 text-primary-700 hover:bg-primary-50"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Run Security Diagnostic
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
