"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Search, MessageSquare, User, Users, Calendar, Clock, StarOff } from "lucide-react"

const starredMessages = [
	{
		id: 1,
		sender: "Alice Johnson",
		message: "The quarterly report looks excellent! Great work on the analysis.",
		starredDate: "2024-01-15",
		originalDate: "2024-01-14",
		avatar: "/placeholder.svg?height=40&width=40",
		isGroup: false,
		importance: "high",
	},
	{
		id: 2,
		sender: "Development Team",
		message: "🎉 Version 2.0 is now live! Thanks everyone for the hard work.",
		starredDate: "2024-01-14",
		originalDate: "2024-01-14",
		avatar: "/placeholder.svg?height=40&width=40",
		isGroup: true,
		importance: "high",
	},
	{
		id: 3,
		sender: "Bob Smith",
		message: "Meeting notes: Key decisions made for the next sprint planning.",
		starredDate: "2024-01-13",
		originalDate: "2024-01-12",
		avatar: "/placeholder.svg?height=40&width=40",
		isGroup: false,
		importance: "medium",
	},
	{
		id: 4,
		sender: "Marketing Team",
		message: "Campaign performance exceeded expectations by 150%! 📈",
		starredDate: "2024-01-12",
		originalDate: "2024-01-11",
		avatar: "/placeholder.svg?height=40&width=40",
		isGroup: true,
		importance: "high",
	},
	{
		id: 5,
		sender: "Sarah Wilson",
		message: "Important: Client feedback on the new design proposals.",
		starredDate: "2024-01-11",
		originalDate: "2024-01-10",
		avatar: "/placeholder.svg?height=40&width=40",
		isGroup: false,
		importance: "medium",
	},
]

export default function StarredPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [filter, setFilter] = useState("all")

	const filteredMessages = starredMessages.filter((msg) => {
		const matchesSearch =
			msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
			msg.message.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesFilter = filter === "all" || msg.importance === filter

		return matchesSearch && matchesFilter
	})

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	const getImportanceColor = (importance: string) => {
		switch (importance) {
			case "high":
				return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
			case "medium":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
		}
	}

	return (
		<SidebarProvider>
			<div className="flex h-screen w-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-black dark:to-gray-900 overflow-hidden">
				<AppSidebar />

				<div className="flex-1 flex flex-col h-screen overflow-hidden">
					<div className="p-6 overflow-y-auto">
						<div className="max-w-6xl mx-auto">
							{/* Header */}
							<div className="flex items-center justify-between mb-6">
								<div>
									<h1 className="text-3xl font-bold text-primary-900 dark:text-gray-100">
										Starred Messages
									</h1>
									<p className="text-primary-700 dark:text-gray-400">
										Important messages you've marked with a star
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 px-3 py-1">
										<Star className="w-3 h-3 mr-1 fill-current" />
										{filteredMessages.length} Starred
									</Badge>
								</div>
							</div>

							{/* Search and Filters */}
							<div className="flex flex-col sm:flex-row gap-4 mb-6">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 dark:text-gray-500 w-4 h-4" />
									<Input
										placeholder="Search starred messages..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10 border-primary-200 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
									/>
								</div>
								<div className="flex space-x-2">
									<Button
										variant={filter === "all" ? "default" : "outline"}
										size="sm"
										onClick={() => setFilter("all")}
										className={
											filter === "all"
												? "bg-primary-600 hover:bg-primary-700"
												: "border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
										}
									>
										All
									</Button>
									<Button
										variant={filter === "high" ? "default" : "outline"}
										size="sm"
										onClick={() => setFilter("high")}
										className={
											filter === "high"
												? "bg-red-600 hover:bg-red-700"
												: "border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
										}
									>
										High Priority
									</Button>
									<Button
										variant={filter === "medium" ? "default" : "outline"}
										size="sm"
										onClick={() => setFilter("medium")}
										className={
											filter === "medium"
												? "bg-yellow-600 hover:bg-yellow-700"
												: "border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
										}
									>
										Medium Priority
									</Button>
								</div>
							</div>

							{/* Stats Cards */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
								<Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
									<CardContent className="p-4">
										<div className="flex items-center space-x-2">
											<Star className="w-8 h-8 text-yellow-500 fill-current" />
											<div>
												<p className="text-2xl font-bold text-primary-900 dark:text-gray-100">
													{filteredMessages.length}
												</p>
												<p className="text-sm text-primary-600 dark:text-gray-400">
													Total Starred
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
								<Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
									<CardContent className="p-4">
										<div className="flex items-center space-x-2">
											<MessageSquare className="w-8 h-8 text-red-500" />
											<div>
												<p className="text-2xl font-bold text-primary-900 dark:text-gray-100">
													{
														filteredMessages.filter(
															(msg) => msg.importance === "high"
														).length
													}
												</p>
												<p className="text-sm text-primary-600 dark:text-gray-400">
													High Priority
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
								<Card className="border-primary-200 dark:border-gray-700 dark:bg-gray-800">
									<CardContent className="p-4">
										<div className="flex items-center space-x-2">
											<Users className="w-8 h-8 text-blue-500" />
											<div>
												<p className="text-2xl font-bold text-primary-900 dark:text-gray-100">
													{
														filteredMessages.filter((msg) => msg.isGroup)
															.length
													}
												</p>
												<p className="text-sm text-primary-600 dark:text-gray-400">
													From Groups
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Starred Messages List */}
							<div className="space-y-4">
								{filteredMessages.map((message) => (
									<Card
										key={message.id}
										className="hover:shadow-md transition-shadow border-primary-200 dark:border-gray-700 dark:bg-gray-800"
									>
										<CardContent className="p-6">
											<div className="flex items-start justify-between">
												<div className="flex items-start space-x-4 flex-1">
													<Avatar className="w-12 h-12 ring-2 ring-primary-200 dark:ring-gray-700">
														<AvatarImage src={message.avatar || "/placeholder.svg"} />
														<AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-gray-700 dark:text-gray-300">
															{message.isGroup ? (
																<Users className="w-6 h-6" />
															) : (
																<User className="w-6 h-6" />
															)}
														</AvatarFallback>
													</Avatar>
													<div className="flex-1 min-w-0">
														<div className="flex items-center space-x-2 mb-2">
															<h3 className="font-semibold text-primary-900 dark:text-gray-100 text-lg">
																{message.sender}
															</h3>
															{message.isGroup && (
																<Users className="w-4 h-4 text-primary-500 dark:text-gray-400" />
															)}
															<Badge className={getImportanceColor(message.importance)}>
																{message.importance} priority
															</Badge>
															<Star className="w-4 h-4 text-yellow-500 fill-current" />
														</div>
														<p className="text-primary-700 dark:text-gray-300 mb-3 leading-relaxed">
															{message.message}
														</p>
														<div className="flex items-center space-x-4 text-sm text-primary-500 dark:text-gray-500">
															<div className="flex items-center space-x-1">
																<Calendar className="w-4 h-4" />
																<span>
																	Starred: {formatDate(message.starredDate)}
																</span>
															</div>
															<div className="flex items-center space-x-1">
																<Clock className="w-4 h-4" />
																<span>
																	Original: {formatDate(message.originalDate)}
																</span>
															</div>
														</div>
													</div>
												</div>
												<div className="flex items-center space-x-2">
													<Button
														variant="outline"
														size="sm"
														className="border-primary-300 text-primary-700 hover:bg-primary-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
													>
														<MessageSquare className="w-4 h-4 mr-2" />
														View Chat
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="text-yellow-600 hover:text-yellow-700 border-yellow-300 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
													>
														<StarOff className="w-4 h-4" />
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>

							{/* Empty State */}
							{filteredMessages.length === 0 && (
								<div className="text-center py-12">
									<Star className="w-16 h-16 text-primary-300 dark:text-gray-600 mx-auto mb-4" />
									<h3 className="text-lg font-medium text-primary-900 dark:text-gray-100 mb-2">
										No starred messages
									</h3>
									<p className="text-primary-600 dark:text-gray-400">
										{searchTerm
											? "No starred messages match your search"
											: "Star important messages to find them easily later"}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</SidebarProvider>
	)
}

/**
 * Smoothly scrolls the given element into view, with optional highlight and callback.
 * @param element The HTMLElement to scroll into view
 * @param options ScrollIntoView options (optional)
 * @param highlight If true, highlights the element after scrolling (default: false)
 * @param highlightColor The background color to use for highlight (default: yellow)
 * @param highlightDuration How long the highlight lasts in ms (default: 800)
 * @param onDone Optional callback after scrolling and highlight
 */
export function smoothScrollIntoView(
	element: HTMLElement | null,
	options: ScrollIntoViewOptions = { behavior: "smooth", block: "center" },
	highlight: boolean = false,
	highlightColor: string = "#fef08a",
	highlightDuration: number = 800,
	onDone?: () => void
) {
	if (!element) return

	element.scrollIntoView(options)

	if (highlight) {
		const original = element.style.transition
		const originalBg = element.style.backgroundColor
		element.style.transition = "background-color 0.3s"
		element.style.backgroundColor = highlightColor

		setTimeout(() => {
			element.style.backgroundColor = originalBg
			element.style.transition = original
			if (onDone) onDone()
		}, highlightDuration)
	} else if (onDone) {
		setTimeout(onDone, 400) // Estimate scroll duration
	}
}
